import Component from "@/components/comp-547";
import "../pages/search/loading.css"

export default function MyUpload({loading, onUploadVisible, onUpload}){
    return (
    <div id="fileupload" className="flex fixed z-30 inset-0 justify-center items-center mt-14 bg-gray-600/65 backdrop-blur-sm">
        <div className="flex flex-col justify-center items-center h-full w-full">
            {loading ?
            // 
            // Cooking Loader by Cr8tiveJen
            // Source: https://codepen.io/Cr8tiveJen/pen/povjYOm
            // Licensed under MIT License
            // 
            (<div id="loader">
                <h1>Cooking in progress</h1>
                <div id="cooking">
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div id="area">
                        <div id="sides">
                            <div id="pan"></div>
                            <div id="handle"></div>
                        </div>
                        <div id="pancake">
                            <div id="pastry"></div>
                        </div>
                    </div>
                </div>
            </div>) :
            (<Component 
            onUploadVisible={onUploadVisible}
            onUpload={onUpload}
            />   
                )}
        </div>
    </div>
    )
}