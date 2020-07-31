import React, { useCallback, useReducer, Fragment } from 'react';

import { Layout } from '@layouts/Default';
import { RouteHeader } from '@components/shared/RouteHeader';
import { SectionHeader } from '@components/shared/SectionHeader';

import styles from './index.module.scss';

type Props = {
  pathname: string;
};

const reducer = (
  state: { [K in 'hiddenAbout' | 'hiddenSkills' | 'hiddenLikes']: boolean },
  action: { type: 'intersectAbout' | 'intersectSkills' | 'intersectLikes' },
) => {
  switch (action.type) {
    case 'intersectAbout':
      return { ...state, hiddenAbout: false };
    case 'intersectSkills':
      return { ...state, hiddenSkills: false };
    case 'intersectLikes':
      return { ...state, hiddenLikes: false };
    default:
      return state;
  }
};

const initialState = {
  hiddenAbout: true,
  hiddenSkills: true,
  hiddenLikes: true,
} as const;

const skills = {
  intro: '振り返ると広く浅くでしぶとく生き延びてきましたが、まとめてみると以下のようになりました。',
  data: [
    {
      heading: 'できること',
      description: 'Web フロントエンド、またその周辺技術がメインです。',
      skills: [
        {
          subject: 'TypeScript',
          descriptions: [
            'Conditional Types や infer くらいなら普通に使いますが既存ライブラリへの黒魔術的型付けはウッとなる…という距離感で使ってます。as const は神様のような機能だと思います。',
            'tsc で型チェック、babel でトランスパイル派です。',
          ],
        },
        {
          subject: 'React',
          descriptions: [
            '最新の機能は一通りおっかけてますし使ってます。Experimental 系はヒトサマの記事を読んでほーそういう方向で行くのね、でも実際試すのは正式版のあとでええわという体で追ってます。',
            'Hooks は素晴らしー。',
            'redux, MobX とか flux architecture 領域のライブラリには正直あんまり関心がないです。もともとの設計がきっちりしてれば OK（それがムズいんだけど）。ちなみにお仕事では一応 MobX を使ってます。',
            'styled-component や emotion などの CSS in JS ライブラリにも正直関心はないですが使ってくれと言われれば使います。お仕事では emotion を使用しています。TS で補完が効くの楽だなーと思いつつ stylis は autoprefixer と微妙に違うからめんどいなーと思ったり。',
          ],
        },
        {
          subject: 'CSS',
          descriptions: [
            'dart-sass + PostCSS 構成でモダン Web 開発できます。Next.js にもねじ込んでます。',
            'SCSS は薄く使え派です。「grep でヒットしないセレクタは書かない」を課してます。',
            'CSS Modules が好きですが最近の動向を見ていると BEM でやりきるのが良いかなと思っています。',
            'BEM より難易度の高い設計が必要な場合は React や Vue などコンポーネント指向で開発できるライブラリの出番だと思っているので避けてます。',
            'CSS Animation が好きで Web 制作会社にいたころはフルスクラッチでなんでも書いていました。既存のライブラリは使い方を覚えるのがたいへん & 柔軟性に欠け要求を満たせないケースがあったので一貫してフルスクラッチです。',
          ],
        },
        {
          subject: 'HTML',
          descriptions: [
            'デザインや要求に応じたタグを使うようにしています。間違えることもあります。',
            'WAI-ARIA もできる範囲で気を使ってます。型をつけるイメージでやってます。',
          ],
        },
        {
          subject: 'SVG',
          descriptions: [
            'ふつうに便利だなー叩けば応えてくれるなーと思いながらごりごりいじっています。Web で Typography やるなら一択だと思っています。',
            'IE の都合で CSS でできない表現を SVG 使ってやる、みたいなレベルなら日常でした。',
            '変形系はあんまり得意ではないので、今後学んでいきたいと思っています。',
          ],
        },
        {
          subject: 'Web 制作',
          descriptions: [
            'ちらちらここまでの記述にもありますが、真剣に Web 制作をしていたので今でもできます。',
            '別に React は必要ないです。ただしトランスパイル言語は工数の短縮やバグの防止のためにいくつか使いたいです。',
            'IE10 までなら現代的な Web サイトを構築できます。それ未満はさすがに厳しいです。',
          ],
        },
        {
          subject: '開発環境整備',
          descriptions: [
            'アプリケーション開発環境の整備、スクラッチで一通りできます。',
            'ESLint, prettier, cspell, husky, lint-staged など、現代的なツールを必要に応じて組み込み、設定できます。',
            'monorepo は yarn でなら経験ありますが lerna などライブラリに頼った構築経験はございません。',
            'Universal JavaScript の開発環境もスクラッチで組んだことあります（ただしプロダクションでは無しです）。',
            '最近では Next.js や Nuxt.js の上で開発するのが大抵の場合において最適解になりえると考えています。',
            'Rollup を用いた React のコンポーネントライブラリ開発環境もできます。というかテンプレを作ってあります。',
          ],
        },
      ],
    },
    {
      heading: 'できないこと',
      description: '以下のような事柄は苦手、未経験、もしくはダメでした。',
      skills: [
        {
          subject: 'ユニットテスト全般',
          descriptions: [
            'ふつうに書けますが、特殊なスキルや知識があるわけではないです。',
            'TDD, BDDについては知識としては持っていますがそれだけです。とくべつな意見もとくにありません。',
          ],
        },
        {
          subject: 'WebGL',
          descriptions: ['ダメです。ごりごりやってる人を尊敬しています。'],
        },
        {
          subject: 'WebRTC',
          descriptions: ['さっぱりです。'],
        },
        {
          subject: '認証系',
          descriptions: ['基本的なことはもちろんわかっておりますが、概ね雰囲気でやってます。'],
        },
        {
          subject: 'デザイン',
          descriptions: ['できませんが、業務上でおかしな指摘をしないように最低限の勉強はしてる。はず。'],
        },
        {
          subject: 'CSS Framework',
          descriptions: [
            '昔 Bootstrap2 をお仕事で使ったっきりでリセット系以外は使わなくなりました。管理画面を作れ、と言われたら既存のライブラリのスタイルを目コピして使うと思います。',
          ],
        },
        {
          subject: 'git',
          descriptions: ['merge や rebase など日常的に使うコマンド以外はすぐ忘れます。cherry-pick が限界です。'],
        },
        {
          subject: 'WASM',
          descriptions: ['これからやろうと思って Rust をこつこつ学んでいます。'],
        },
        {
          subject: 'クラウド系サービス大半',
          descriptions: [
            'AWS へログインしてアイコンがズラッと出た瞬間にダメだと思いました',
            'firebase は案件でちょっとだけ触ったことがありますが、本格的な運用経験はありません。',
          ],
        },
      ],
    },
    {
      heading: 'やっていたが、ほとんど忘れた',
      description: '以下は経験がありますけど近頃はさっぱりふれておらずきれーに忘れたものです。',
      skills: [
        {
          subject: 'RDB のいろいろ',
          descriptions: [
            'MySQL(InnoDB), PostgreSQL, Microsoft SQL Server などを使ったシステム開発経験がありますが、ここ数年ほとんど触ってないのでいろいろ厳しいです。',
            'たまにクエリ書きたいな―という気分になることもあります。',
          ],
        },
        {
          subject: 'Ruby, Python3, C#, Java, C++, Shell Script',
          descriptions: [
            'いずれも業務レベルで使用していましたが、長いこと触っていないのでほとんど覚えていません。真剣にソフトウェア開発に取り組んでいなかった時期に触ったいくつかの言語に関してはかなり厳しいです。',
            'Ruby, Python はたまに Shell だと厳しいレベルのスクリプトが必要になった際に書きますが、毎回思い出すところからスタートしています。',
          ],
        },
        {
          subject: 'Vue.js(Nuxt)',
          descriptions: [
            '1 年ほど前は本業や副業でかなり触っていたのですが、転職後本当にまったく触っていないので厳しいです。',
            '当ウェブサイトもリニューアル前は Nuxt で構築しておりましたがまったく覚えていません。',
          ],
        },
        {
          subject: 'サーバーサイド開発の勘所',
          descriptions: ['Rails, ASP.NET の開発をしてたこともありましたが忘れました'],
        },
        {
          subject: 'Docker',
          descriptions: [
            'macOS 上で使用した際に同期速度が最悪なことに気づいた瞬間にだるくなってしまいました。',
            'docker-sync とか使ってなんとかしようとしたこともありますがやばさを感じて降りました。',
          ],
        },
      ],
    },
  ],
};

const likes = {
  intro: 'ソフトウェア開発以外の好きなものは以下です。',
  data: [
    {
      heading: '音楽',
      rows: [
        '一番の趣味です。電子音楽全般、初期ハードコアパンクを中心に雑食でいろいろおっかけてます。',
        '人生において影響を受けているのもだいたいが音楽関係で、Warp Record のミュージシャンやパンクシーンから学んだことが今の自分の基盤になってます。',
      ],
    },
    {
      heading: 'サッカー',
      rows: [
        'アーセナルが長いこと好きで、ティエリ・アンリが抜けたシーズンのサッカーがあまりに鮮烈で未だに忘れられずずっとおっかけてます。が。入れ込みすぎて試合の日は寝られず買っても負けても体調がだめになるのでここ数年意図して避けるようにしてます。',
        'ジュビロ磐田も出身地もあって未だに好きで、生観戦した 2008 年の入れ替え戦第 2 戦は今後の人生含めておそらくはベストマッチ。',
      ],
    },
    {
      heading: '自転車',
      rows: [
        'クロスバイク乗ってます。いま乗ってるのは All-City ってブランドの Space Horse というモデルです。ちょいちょいいじってますがそこまで語れるほど詳しくないし、なにより 1 日に 30km くらい乗ると飽きてしまうという有様です。つまり、あかんです。',
      ],
    },
    {
      heading: 'マイナー食',
      rows: [
        'あまり食べられない国の食事を食べに行くのが好きで、名古屋に住んでいた際には Web 系ではたらく知り合いを集めて食事会を主催していました。モロッコ、ペルー、メキシコ、アフガニスタン、ウイグル自治区、キューバなど。',
        '最近は年齢もあってガツガツ食うとダメージが大きいため関心が薄れつつあります。こういうの老け込むサインだと思ってるのでなんとかしたいですね…。',
      ],
    },
  ],
};

export const AboutTemplate = ({ pathname }: Props) => {
  const [{ hiddenAbout, hiddenSkills, hiddenLikes }, dispatch] = useReducer(reducer, initialState);
  const handleIntersectAbout = useCallback(() => dispatch({ type: 'intersectAbout' }), []);
  const handleIntersectSkills = useCallback(() => dispatch({ type: 'intersectSkills' }), []);
  const handleIntersectLikes = useCallback(() => dispatch({ type: 'intersectLikes' }), []);

  return (
    <Layout appendTitles={['ABOUT']} descriptionArgv="概要" path={pathname}>
      <div className={styles.inner}>
        <RouteHeader lineCount={16} hidden={hiddenAbout} onIntersect={handleIntersectAbout}>
          About
        </RouteHeader>
        <p className={styles.desc}>
          kaave こと、安部亨佑のポータルサイトです。Web
          技術の実験をしつつ、日常の思いつきやらなんやらをちょいちょい残す場が欲しいわね～ということで作成しました。
          ポータルサイト何回か作っちゃ放置しちゃを繰り返してるんですが、ドメインまでとったのははじめてだと思う。
        </p>
        <p className={styles.desc}>
          名古屋にてSIer、Web制作会社、ベンチャーなど経験した後に満を持して上京、2019 年より
          <a className={styles.link} href="https://www.legalforce.co.jp/" target="_blank" rel="noopener noreferrer">
            株式会社 LegalForce
          </a>
          所属。Web フロントエンドまわりを広く浅くやってます。
        </p>
        <section className={styles.section}>
          <SectionHeader hidden={hiddenSkills} onIntersect={handleIntersectSkills}>
            Skills
          </SectionHeader>
          <p className={styles.introduction}>{skills.intro}</p>
          {skills.data.map(({ heading, description, skills: skillDetails }) => (
            <Fragment key={heading}>
              <h4 className={styles.skillHeading}>{heading}</h4>
              <p className={styles.skillSectionDescription}>{description}</p>
              {skillDetails.map(({ subject, descriptions }) => (
                <Fragment key={subject}>
                  <h5 className={styles.subject}>{subject}</h5>
                  {descriptions.map((desc) => (
                    <p key={desc} className={styles.paragraph}>
                      {desc}
                    </p>
                  ))}
                </Fragment>
              ))}
            </Fragment>
          ))}
        </section>
        <section className={styles.section}>
          <SectionHeader hidden={hiddenLikes} onIntersect={handleIntersectLikes}>
            Likes
          </SectionHeader>
          <p className={styles.introduction}>{likes.intro}</p>
          <ul>
            {likes.data.map(({ heading, rows }) => (
              <Fragment key={heading}>
                <h4 className={styles.subject}>{heading}</h4>
                {rows.map((text) => (
                  <p key={text} className={styles.paragraph}>
                    {text}
                  </p>
                ))}
              </Fragment>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
};
