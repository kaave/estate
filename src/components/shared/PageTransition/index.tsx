// original code: https://github.com/illinois/next-page-transitions/blob/master/src/PageTransition.js

/* eslint-env browser */
// We (supposedly) know what we're doing
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react/state-in-constructor */

import React from 'react';
import Transition from 'react-transition-group/Transition';
import CSSTransition from 'react-transition-group/CSSTransition';
import type { ComponentProps } from 'react';
import type { Children, TransitionState } from './model';
import { shouldDelayEnter, areChildrenDifferent, differentChildrenNeedAnimation, buildClassName } from './utils';

type Props = {
  children: Children;
  classNames: string;
  timeout: ComponentProps<typeof Transition>['timeout'];
  tag?: string;
  loadingDelay?: number;
  timeoutId?: number;
  skipInitialTransition?: boolean;
  monkeyPatchScrolling?: boolean;
  loadingCallbackName?: string;
  loadingClassNames?: string;
  loadingTimeout?: number;
  loadingComponent?: Children;
};

type State = {
  state: TransitionState;
  isIn: boolean;
  showLoading: boolean;
  currentChildren: Children;
  renderedChildren: Children;
  timeoutId?: number;
  nextChildren?: Children;
};

export class PageTransition extends React.Component<Props, State> {
  originalScrollTo?: typeof window.scrollTo;
  disableScrolling?: boolean;

  constructor(props: Props) {
    super(props);

    const { children } = props;
    this.state = {
      state: props.skipInitialTransition ? 'init' : 'enter',
      isIn: !shouldDelayEnter(children),
      currentChildren: children,
      renderedChildren: children,
      showLoading: false,
    };
  }

  componentDidMount() {
    const { children, monkeyPatchScrolling } = this.props;
    if (shouldDelayEnter(children)) this.setState({ timeoutId: this.startEnterTimer() });

    if (monkeyPatchScrolling && typeof window !== 'undefined') {
      // Forgive me for what I'm about to do
      this.originalScrollTo = window.scrollTo;
      this.disableScrolling = false;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      window.scrollTo = ((...args: Parameters<typeof window.scrollTo>) => {
        if (this.disableScrolling || !this.originalScrollTo) return;
        this.originalScrollTo(...args);
      }) as any;
    }
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    const { currentChildren, renderedChildren, nextChildren, isIn, state } = this.state;
    const { children } = this.props;
    const { timeoutId, showLoading } = this.state;
    const hasNewChildren = areChildrenDifferent(currentChildren, children);
    const needsTransition = areChildrenDifferent(renderedChildren, children);
    const shouldAnimateTransition = needsTransition && differentChildrenNeedAnimation(renderedChildren, children);
    if (isIn && needsTransition && !shouldAnimateTransition) {
      // We need to update our rendered children, but we shouldn't animate them.
      // This will occur when the key prop on our children stays the same but
      // the children themselves change. This can happen in a lot of cases: HMR,
      // a re-render due to a Redux state change, a Router.push to the current page,
      // etc. In this case, we'll just immediately flush the children to be
      // rendered.
      this.setState({
        currentChildren: children,
        renderedChildren: children,
      });
    } else if (hasNewChildren) {
      // We got a new set of children while we were transitioning some in
      // Immediately start transitioning out this component and update the next
      // component
      this.setState({
        isIn: false,
        nextChildren: children,
        currentChildren: children,
      });

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    } else if (needsTransition && !isIn && (state === 'enter' || state === 'exited')) {
      if (shouldDelayEnter(nextChildren)) {
        // Wait for the ready callback to actually transition in, but still
        // mount the component to allow it to start loading things
        this.setState({
          renderedChildren: nextChildren,
          nextChildren: undefined,
          timeoutId: this.startEnterTimer(),
        });
      } else {
        // No need to wait, mount immediately
        this.setState({
          isIn: true,
          renderedChildren: nextChildren,
          nextChildren: undefined,
        });
      }
    } else if (prevState.showLoading && !showLoading) {
      // We hid the loading indicator; now that that change has been flushed to
      // the DOM, we can now bring in the next component!
      this.setState({ isIn: true });
    }
  }

  componentWillUnmount() {
    if (this.originalScrollTo && typeof window !== 'undefined') {
      window.scrollTo = this.originalScrollTo;
    }
    const { timeoutId } = this.state;
    if (timeoutId) clearTimeout(timeoutId);
  }

  handleEnter = () => {
    // It's safe to re-enable scrolling now
    this.disableScrolling = false;
    this.setState({ state: 'enter', showLoading: false });
  };

  handleEntering = () => this.setState((prev) => ({ ...prev, state: 'entering' }));
  handleEntered = () => this.setState((prev) => ({ ...prev, state: 'entered' }));

  handleExit = () => {
    // Disable scrolling until this component has unmounted
    this.disableScrolling = true;
    this.setState({ state: 'exit' });
  };

  handleExiting = () => this.setState((prev) => ({ ...prev, state: 'exiting' }));
  handleExited = () => this.setState((prev) => ({ ...prev, state: 'exited', renderedChildren: null }));

  handleChildLoaded = () => {
    const { timeoutId, showLoading } = this.state;
    if (timeoutId) clearTimeout(timeoutId);
    if (showLoading) {
      // We'll hide the loader first and animate in the page on the next tick
      this.setState({ showLoading: false });
    } else {
      // We can immediately bring in the next page!
      this.setState({ isIn: true });
    }
  };

  startEnterTimer = () => window.setTimeout(() => this.setState({ showLoading: true }), this.props.loadingDelay ?? 500);

  render() {
    const {
      timeout,
      loadingComponent,
      classNames,
      loadingClassNames,
      loadingTimeout,
      tag: Tag = 'div',
      loadingCallbackName = 'pageTransitionReadyToEnter',
      skipInitialTransition = false,
    } = this.props;

    const { renderedChildren: children, state, isIn, showLoading } = this.state;

    if (['entering', 'exiting', 'exited'].includes(state)) {
      // Need to reflow!
      // @TODO なんもしとらんやんけ
      // if (document.body) document.body.scrollTop;
      if (document.body) document.body.scrollTop = 0;
    }

    return (
      <>
        <Transition
          timeout={timeout}
          in={isIn}
          appear={!skipInitialTransition}
          onEnter={this.handleEnter}
          onEntering={this.handleEntering}
          onEntered={this.handleEntered}
          onExit={this.handleExit}
          onExiting={this.handleExiting}
          onExited={this.handleExited}
          addEndListener={console.log}
        >
          {/* @ts-ignore */}
          <Tag className={buildClassName(classNames, state)}>
            {/* @ts-ignore */}
            {children ? React.cloneElement(children, { [loadingCallbackName]: this.handleChildLoaded }) : null}
          </Tag>
        </Transition>
        {loadingComponent ? (
          <CSSTransition
            in={showLoading}
            classNames={loadingClassNames}
            timeout={loadingTimeout}
            addEndListener={console.log}
            mountOnEnter
            unmountOnExit
            appear
          >
            {loadingComponent}
          </CSSTransition>
        ) : null}
      </>
    );
  }
}
