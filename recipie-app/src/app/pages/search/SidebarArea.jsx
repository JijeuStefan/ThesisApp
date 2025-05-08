import { Minus } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem
  } from "@/components/ui/sidebar"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import {
    Input
} from "@/components/ui/input"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useState } from 'react';

const intolerances = ["dairy", "egg", "gluten", "peanut", "sesame", "seafood", "shellfish", "soy", "sulfite", "tree nut", "wheat"];
const diet = ["pescetarian", "lacto vegetarian", "ovo vegetarian", "vegan", "paleo", "primal", "vegetarian"];

export default function SidebarArea({searchParams, onParamChange, onIncludeIngredient, onExcludeIngredient, onIntoleranceChange}){
    const [includenIngredient, setIncludeIngredient] = useState('');
    const [excludeIngredient, setExcludeIngredient] = useState('');

    const handleAddIncludeIngredient = () => {
        if (includenIngredient.trim() !== ""){
            if (!searchParams.includeIngredients.includes(includenIngredient)){
                onIncludeIngredient(includenIngredient, true);
                setIncludeIngredient('');
            }
        }
    }

    const handleRemoveIncludeIngredient = (ingredient) => {
        onIncludeIngredient(ingredient, false);
    }

    const handleAddExcludeIngredient = () => {
        if (excludeIngredient.trim() !== ""){
            if (!searchParams.excludeIngredients.includes(excludeIngredient)){
                onExcludeIngredient(excludeIngredient, true);
                setExcludeIngredient('');
            }
        }
    }

    const handleRemoveExcludeIngredient = (ingredient) => {
        onExcludeIngredient(ingredient, false);
    }
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Filters</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>Inlude Ingredients</SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem className="flex items-center gap-2 p-0.5">
                                                <div className="flex flex-col w-full gap-y-2">
                                                    <div className="flex flex-row items-center gap-1">
                                                        <Input 
                                                        list="includeIngredientsDataList"
                                                        value={includenIngredient}
                                                        onChange={(e)=> setIncludeIngredient(e.target.value)}
                                                        />
                                                        <datalist id="includeIngredientsDataList">
                                                            <option value="Apple"/>
                                                            <option value="Banana"/>
                                                            <option value="Orange"/>
                                                            <option value="Mango"/>
                                                        </datalist>
                                                        <Button onClick={() => handleAddIncludeIngredient()}>Add</Button>
                                                    </div>
                                                    <div className="flex flex-col w-full p-2 gap-1 rounded-md border border-input bg-background">
                                                        {searchParams.includeIngredients.length > 0  && searchParams.includeIngredients.map((ingredient) =>{
                                                            return(<div key={ingredient} className="flex flex-row items-center justify-between text-sm py-1 px-2 rounded hover:bg-accent">
                                                                <span>{ingredient}</span>
                                                                <Button variant="ghost" 
                                                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                                                onClick={()=>{handleRemoveIncludeIngredient(ingredient)}}
                                                                >
                                                                    <Minus/>
                                                                </Button>  
                                                            </div>)
                                                        })}  
                                                    </div>                                                                                                     
                                                </div>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>Exclude Ingredients</SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem className="flex items-center gap-2 p-0.5">
                                                <div className="flex flex-col w-full gap-y-2">
                                                    <div className="flex flex-row items-center gap-1">
                                                        <Input 
                                                        list="exludeIngredientsDataList"
                                                        value={excludeIngredient}
                                                        onChange={(e)=> setExcludeIngredient(e.target.value)}
                                                        />
                                                        <datalist id="exludeIngredientsDataList">
                                                            <option value="Apple"/>
                                                            <option value="cinnamon"/>
                                                            <option value="Orange"/>
                                                            <option value="Mango"/>
                                                        </datalist>
                                                        <Button onClick={() => handleAddExcludeIngredient()}>Add</Button>
                                                    </div>
                                                    <div className="flex flex-col w-full p-2 gap-1 rounded-md border border-input bg-background">
                                                        {searchParams.excludeIngredients.length > 0  && searchParams.excludeIngredients.map((ingredient) =>{
                                                            return(<div key={ingredient} className="flex flex-row items-center justify-between text-sm py-1 px-2 rounded hover:bg-accent">
                                                                <span>{ingredient}</span>
                                                                <Button variant="ghost" 
                                                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                                                onClick={()=>{handleRemoveExcludeIngredient(ingredient)}}
                                                                >
                                                                    <Minus/>
                                                                </Button>  
                                                            </div>)
                                                        })}  
                                                    </div>                                                                                                     
                                                </div>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>Time</SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem className="flex items-center gap-2 p-0.5">
                                                <Input 
                                                type="number" 
                                                placeholder="Time limit (mins)" 
                                                min="5" 
                                                step="5"
                                                value={searchParams.maxReadyTime}
                                                onChange={(e) => {onParamChange("maxReadyTime", e.target.value)}}>
                                                </Input>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>Cuisine</SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem className="flex items-center gap-2 p-0.5">
                                                <Input 
                                                type="text" 
                                                placeholder="e.g: indian,korean"
                                                value={searchParams.cuisine}
                                                onChange={(e) => {onParamChange("cuisine", e.target.value)}}>                                                    
                                                </Input>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>Diet</SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem className="flex items-center gap-2 p-0.5">
                                                <Select
                                                    value={searchParams.diet}
                                                    onValueChange={(value) => onParamChange("diet", value === "none" ? "" : value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="none">-- None --</SelectItem> 
                                                        {diet.length > 0 && diet.map((item) => {
                                                            return (
                                                                <SelectItem 
                                                                key={item}
                                                                value={item}>{item}</SelectItem>
                                                            )
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>Intolerances</SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>                                 
                                            {intolerances.map((intolerance) => (
                                                <SidebarMenuSubItem
                                                    key={intolerance}
                                                    className="flex items-center gap-2 p-0.5"
                                                >
                                                    <Checkbox
                                                    id={intolerance}
                                                    checked={searchParams.intolerances.includes(intolerance)}
                                                    onCheckedChange={(checked) =>
                                                        onIntoleranceChange(intolerance, checked)
                                                    }
                                                    />
                                                    <label htmlFor={intolerance} className="text-sm font-normal cursor-pointer"> 
                                                    {intolerance}
                                                    </label>
                                                </SidebarMenuSubItem>
                                            ))}                                           
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}