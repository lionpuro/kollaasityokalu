import {useCanvasData, useCanvasImageData} from "@/hooks/useReduxData"
import {useEffect, useRef} from "react"
import UploadDropboxIcon from "@/components/Icon/UploadDropboxIcon"
import toast from "react-hot-toast"
import clsx from "clsx"
import {useState} from 'react'
import LoadingOverlay from 'react-loading-overlay-ts';


export default function UploadDropboxButton() {
    const linkRef = useRef<HTMLAnchorElement | null>(null)
    const {canvas} = useCanvasData()
    const {uploadCount, maxImageUploads} = useCanvasImageData()
    const [isActive, setIsActive] = useState(false)

    const uploadDropboxImage = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const dbxapk = urlParams.get('dbxapk');
        const pSize = urlParams.get('pSize');
        const pType = urlParams.get('pType');
        const customerName = urlParams.get('name');

        if (canvas && linkRef.current && dbxapk && pSize && pType && customerName) {
            canvas.discardActiveObject();
            var collageSource = canvas.toDataURL({multiplier: 10});
            var blob = dataURItoBlob(collageSource);
            const collageName = `collage-${new Date().getTime()}.png`;
            let fileUploadPath = '/' + pSize + '/' + pType + '/' + customerName + '/' + collageName;

            try {
                const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + dbxapk,
                        'Content-Type': 'application/octet-stream',
                        'Dropbox-API-Arg': JSON.stringify({
                            path: fileUploadPath,
                            mode: 'add',
                            autorename: true,
                            mute: false
                        })
                    },
                    body: blob
                });

                if (response.ok) {
                    window.opener.postMessage( {collageName: collageName, collageSource: collageSource},"*" );
                    toast.success("Kollaasi ladattu", {id: "toast-upload-dropbox"});
                     window.opener.focus();
                     window.close();
                    setIsActive(false);
                } else {
                    setIsActive(false);
                    const errorText = await response.text();
                    console.log(errorText);
                    toast.error("Kollaasia ei voi ladata! :(", {id: "toast-upload-dropbox"});
                }
            } catch (e) {
                setIsActive(false)
                console.log(e);
                toast.error("Kollaasia ei voi ladata! :(", {id: "toast-upload-dropbox"});
            }
        } else {
            setIsActive(false)
            toast.error("Kollaasia ei voi ladata! :(", {id: "toast-upload-dropbox"})
        }
    }

    useEffect(() => {
        isActive && uploadDropboxImage()
    }, [isActive]);
    return (

        <div className={clsx("bottom-0 left-0 pb-4 px-2", "sm:fixed sm:p-4")}>
            <a ref={linkRef} id="uploadDropbox" className="hidden"></a>
            <LoadingOverlay
                active={isActive}
                spinner
                text='Ladataan...'>
            <button
                className={clsx([
                    "w-full flex items-center justify-center",
                    "mt-4 px-5 py-3 text-sm font-semibold",
                    "transition transition-colors",
                    "rounded bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500"
                ])}
                onClick={ ()=>setIsActive(true)}
                disabled={uploadCount !== maxImageUploads}
            >
                <UploadDropboxIcon className="mr-2"/>
                <span>Valmis, <span className="inline sm:hidden md:inline">palaa kauppaan</span></span>
            </button>
            </LoadingOverlay>
        </div>
    )
}

function dataURItoBlob(dataURI: string) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;

    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);

    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {
        type: mimeString
    });
}
