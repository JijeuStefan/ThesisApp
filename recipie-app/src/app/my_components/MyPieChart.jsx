import { LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


function createConfig(toolTipLabel, items){
    let config = {};
    config[toolTipLabel] = {label: toolTipLabel};
    items.forEach(element => {
        config[element.key] = {label: element.key, value:element.value, color: element.color}
    });
    return config;
}

function createData(toolTipLabel, listLabel, items){
    let data = [];
    items.forEach(element => {
        data.push({[listLabel]: element.key, [toolTipLabel]: element.value, fill: `var(--color-${element.key})`})
    })
    return data;
}

export default function NutritionPieChart({title, desc, toolTipLabel, listLabel, items}) {
    const chartConfig = createConfig(toolTipLabel, items);
    const chartData = createData(toolTipLabel, listLabel, items);
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{desc}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
                >
                <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey={toolTipLabel} hideLabel />}/>
                    <Pie data={chartData} dataKey={toolTipLabel}>
                    <LabelList
                        dataKey={listLabel}
                        className="fill-background"
                        stroke="none"
                        fontSize={12}
                        formatter={(value) =>
                        chartConfig[value]?.label
                        }
                    />
                    </Pie>
                </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
    }
