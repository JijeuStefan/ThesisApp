import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchTitle(){
    return (
    <div className="flex flex-row items-center justify-start p-4 gap-2">
        <div className="flex flex-row items-center w-full gap-2">
            <Input id="title" type="text" placeholder="Find a recipie" ></Input>
            <Button>Search</Button>
            <Button>Upload</Button>
        </div>
    </div>
    )
}