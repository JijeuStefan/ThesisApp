import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Component from "@/components/comp-547"
import { FunnelPlus } from 'lucide-react';
import "./loading.css"

import { useState } from "react"
import axios from "axios";

export default function SearchTitle({query, onQueryChange, fetchRecipes}){
    const [uploadVisible, setUploadVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleUploadVisible = () => {
        setUploadVisible(false);
    }

    const handleUpload = async() => {
        setLoading(true);
        const options = {
            method: 'GET',
            url: `http://localhost:5000/images/upload`
            };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            handleUploadVisible();
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
    <div className="flex flex-row items-center justify-start p-4 gap-2">
        <div className="flex flex-row items-center w-full gap-2">
            <Button><FunnelPlus></FunnelPlus></Button>
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
                    <div className="flex flex-col justify-center items-center h-full w-full">
                        {loading ?
                        // 
                        // Cooking Loader by Cr8tiveJen
                        // Source: https://codepen.io/Cr8tiveJen/pen/povjYOm
                        // Licensed under MIT License
                        // 
                        (<div id="main">
                            <h1>Cooking in progress</h1>
                            <div id="cooking">
                                <div class="bubble"></div>
                                <div class="bubble"></div>
                                <div class="bubble"></div>
                                <div class="bubble"></div>
                                <div class="bubble"></div>
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
                        onUploadVisible={handleUploadVisible}
                        onUpload={handleUpload}
                        />   
                         )}
                    </div>
                </div>
            )}
    </div>
    )
}