const APP_NAME = 'nextarter-chakra';

const Meta = () => {
  return (
    <>
      <meta name="application-name" content={APP_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={APP_NAME} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#FFFFFF" />
      <meta name="monetag" content="f49237acd57f80362fd971e9baeb2d0f" />

      <link rel="shortcut icon" href="/favicon.ico" />

      <link rel="manifest" href="/manifest.json" />
    </>
  );
};

export default Meta;
