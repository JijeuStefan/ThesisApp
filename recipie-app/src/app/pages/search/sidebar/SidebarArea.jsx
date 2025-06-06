import { useIngredientInput } from './useIngredientInput';
import { Plus, Minus } from 'lucide-react';


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

const intolerances = ["dairy", "egg", "gluten", "peanut", "sesame", "seafood", "shellfish", "soy", "sulfite", "tree nut", "wheat"];
const diet = ["pescetarian", "lacto vegetarian", "ovo vegetarian", "vegan", "paleo", "primal", "vegetarian"];


export default function SidebarArea({searchParams, onParamChange, onIncludeIngredient, onExcludeIngredient, onIntoleranceChange}){
    
    const includeInput = useIngredientInput();
    const excludeInput = useIngredientInput();
    
    const handleAddIncludeIngredient = () => {
        const trimmedIngredient = includeInput.inputValue.trim();
        if (trimmedIngredient !== "") {
            if (!searchParams.includeIngredients.includes(trimmedIngredient)) {
                onIncludeIngredient(trimmedIngredient, true);
            }
            includeInput.clearInput();
        }
    };

    const handleRemoveIncludeIngredient = (ingredient) => {
        onIncludeIngredient(ingredient, false);
    };

    
    const handleAddExcludeIngredient = () => {
        const trimmedIngredient = excludeInput.inputValue.trim();
        if (trimmedIngredient !== "") {
            if (!searchParams.excludeIngredients.includes(trimmedIngredient)) {
                onExcludeIngredient(trimmedIngredient, true);
            }
            excludeInput.clearInput();
        }
    };

    const handleRemoveExcludeIngredient = (ingredient) => {
        onExcludeIngredient(ingredient, false);
    };



    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel><p>Filters</p></SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>Include Ingredients</SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem className="flex items-center gap-2 p-0.5">
                                                <div className="flex flex-col w-full gap-y-2">
                                                    <div className="flex flex-row items-center gap-1">
                                                        <Input 
                                                        list="includeIngredientsDataList"
                                                        placeholder="e.g: eggs"
                                                        value={includeInput.inputValue}
                                                        onChange={includeInput.handleInputChange}
                                                        />
                                                        <datalist id="includeIngredientsDataList">
                                                            {includeInput.suggestions.map((ingredient) =>{
                                                                return(<option 
                                                                    key={ingredient.id || ingredient.name} 
                                                                    value={ingredient.name}>                                                                      
                                                                    </option>)
                                                            })}
                                                        </datalist>
                                                        <Button className="hover:text-green-600" variant={"outline"} onClick={handleAddIncludeIngredient}><Plus/></Button>
                                                    </div>
                                                    {searchParams.includeIngredients.length > 0  && (
                                                        <div className="flex flex-col w-full p-2 gap-1 rounded-md border border-input bg-background">
                                                        {searchParams.includeIngredients.map((ingredient) =>{
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
                                                    )}
                                                                                                                                                         
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
                                                        placeholder="e.g: milk"
                                                        value={excludeInput.inputValue}
                                                        onChange={excludeInput.handleInputChange}
                                                        />
                                                        <datalist id="exludeIngredientsDataList">
                                                            {excludeInput.suggestions.map((ingredient) =>{
                                                                return(<option 
                                                                    key={ingredient.id || ingredient.name} 
                                                                    value={ingredient.name}>                                                                      
                                                                    </option>)
                                                            })}
                                                        </datalist>
                                                        <Button className="hover:text-green-600" variant={"outline"} onClick={handleAddExcludeIngredient}><Plus/></Button>
                                                    </div>
                                                    {searchParams.excludeIngredients.length > 0 && (
                                                        <div className="flex flex-col w-full p-2 gap-1 rounded-md border border-input bg-background">
                                                        {searchParams.excludeIngredients.map((ingredient) =>{
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
                                                    )}                                                                                                                                                     
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
                                                    <Checkbox className="data-[state=checked]:border-white data-[state=checked]:bg-[#cc7a3d] data-[state=checked]:text-white"
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