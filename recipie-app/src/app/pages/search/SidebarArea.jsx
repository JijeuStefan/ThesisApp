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


export default function SidebarArea({searchParams, onParamChange, onIntoleranceChange}){
    const intolerances = ["dairy", "egg", "gluten", "peanut", "sesame", "seafood", "shellfish", "soy", "sulfite", "tree nut", "wheat"];
    const diet = ["pescetarian", "lacto vegetarian", "ovo vegetarian", "vegan", "paleo", "primal", "vegetarian"];

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Options</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
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
                                                        {diet && diet.map((item) => {
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
                                            {intolerances.map((food) => (
                                                <SidebarMenuSubItem
                                                    key={food}
                                                    className="flex items-center gap-2 p-0.5"
                                                >
                                                    <Checkbox
                                                    id={food}
                                                    checked={searchParams.intolerances.includes(food)}
                                                    onCheckedChange={(checked) =>
                                                        onIntoleranceChange(food, checked)
                                                    }
                                                    />
                                                    <label htmlFor={food} className="text-sm font-normal cursor-pointer"> 
                                                    {food}
                                                    </label>
                                                </SidebarMenuSubItem>
                                            ))}                                           
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
                                                <Input 
                                                type="text" 
                                                placeholder="e.g: eggs,milk"
                                                value={searchParams.excludeIngredients}
                                                onChange={(e) => {onParamChange("excludeIngredients", e.target.value)}}
                                                ></Input>
                                            </SidebarMenuSubItem>
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