import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FunnelPlus, FunnelX } from 'lucide-react';

export default function SearchTitle({query, onQueryChange, fetchRecipes,isSidebarShown, onToggleSidebar, onUploadVisible}){
    return (
    <div className="flex flex-row items-center justify-start p-4 gap-2">
        <div className="flex flex-row items-center w-full gap-2">
            {!isSidebarShown ? (
                <Button variant={"outline"} onClick={onToggleSidebar}>
                    <FunnelPlus/>
                </Button>
            ) :(
                <Button variant={"outline"} onClick={onToggleSidebar}>
                    <FunnelX/>
                </Button>
            )}
            <Input 
            id="title" 
            type="text" 
            placeholder="Find a recipe"
            value={query}
            onChange={(e)=>{onQueryChange(e.target.value)}}
            ></Input>
            <Button onClick={fetchRecipes}>Search</Button>
            <Button onClick={onUploadVisible}>Upload</Button>
        </div>
    </div>
    )
}