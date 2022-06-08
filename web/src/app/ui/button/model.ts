import { ButtonHTMLAttributes } from "react"

export type buttonType = 'default' | 'secondary' | 'delete'

export interface IButtonUiProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: buttonType
}
