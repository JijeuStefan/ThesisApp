import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchTitle({query,onQueryChange,fetchRecipes}){
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
            <Button>Upload</Button>
        </div>
    </div>
    )
}