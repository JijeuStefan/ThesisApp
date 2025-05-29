import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function MyTable({nutrients, properties, caption}){
    return (
    <Table>
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
            <TableRow>
                {properties.map((propertie, index) =>(
                <TableHead key={index} className="font-bold">{propertie.charAt(0).toUpperCase() + propertie.slice(1)}</TableHead>
                ))}
            </TableRow>
        </TableHeader>
        <TableBody>
            {nutrients.map((nutrient, index) =>(
                <TableRow key={index}>
                    {properties.map((propertie, index) => (
                        <TableCell key={index}>{nutrient[propertie]}</TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    </Table>)
}