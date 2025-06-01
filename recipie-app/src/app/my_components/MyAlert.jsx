import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"


export default function MyAlert({className, typeOfAlert, alert, onClose}){
    return (
        <Alert className={`fixed top-4 right-4 z-50 max-w-sm ${className}`} variant={typeOfAlert}>
            <AlertCircleIcon />
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>
                {typeof alert.description === "string"
                    ? <p>{alert.description}</p>
                    : alert.description}
            </AlertDescription>
            {onClose && (
                <Button 
                className="absolute top-0 right-0 text-black" 
                size="icon"
                variant="ghost"
                onClick={onClose}>
                    <X></X>
                </Button>
            )}
        </Alert>
    )
}