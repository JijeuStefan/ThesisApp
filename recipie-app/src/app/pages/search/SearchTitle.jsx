import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Component from "@/components/comp-547"
import { useState } from "react"

export default function SearchTitle({query, onQueryChange, fetchRecipes}){
    const [uploadVisible, setUploadVisible] = useState(false);

    const handleUploadVisible = () => {
        setUploadVisible(false);
    }

    return (
    <div className="flex flex-row items-center justify-start p-4 gap-2">
        <div className="flex flex-row items-center w-full gap-2">
            <Input 
            id="title" 
            type="text" 
            placeholder="Find a recipie" 
            value={query}
            onChange={(e)=>{onQueryChange(e.target.value)}}
            ></Input>
            <Button onClick={fetchRecipes}>Search</Button>
            <Button onClick={() => setUploadVisible(true)}>Upload</Button>
        </div>
            {uploadVisible && (
                <div id="fileupload" className="flex fixed z-30 inset-0 justify-center items-center mt-14 bg-gray-600/65 backdrop-blur-sm">
                    <div className="flex flex-col justify-center items-center">
                        <Component onUploadVisible={handleUploadVisible}/>
                    </div>
                </div>
            )}
        
    </div>
    )
}