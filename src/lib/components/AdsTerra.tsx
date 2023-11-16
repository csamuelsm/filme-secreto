import React, { useEffect, useRef } from 'react'

type AdsTerraProps = {
    key: string,
    format: string,
    width: number,
    height: number,
}

function AdsTerra() {

    const banner = useRef<HTMLDivElement>(null);
    const atOptions = {
        key: '1f18ff67db1c8e6b26bd6776911d0812',
        format: 'iframe',
        height: 50,
        width: 320,
        params: {}
    }

    useEffect(() => {
        console.log(`//www.highcpmcreativeformat.com/${atOptions.key}/invoke.js`)
        if (banner.current && !banner.current.firstChild) {
          //console.log('Entering if useEffect')
          const conf = document.createElement('script');
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = `//www.highcpmcreativeformat.com/${atOptions.key}/invoke.js`;
          conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

          console.log('appending: ', script, conf);
    
          banner.current.append(conf);
          banner.current.append(script);
        }
    }, [banner]);

    return (
        <div className='finish-modal-ads' ref={banner} style={{
            marginTop: '3px',
            marginBottom: '3px',
            width: '320px',
            height: '50px'
        }}>
        </div>
    )
}

export default AdsTerra
