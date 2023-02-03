import { css, CSSObject, SimpleInterpolation } from "styled-components";

type DeviceType = "desktop" | "tablet" | "phone";

const sizes : Record<DeviceType, number> = {
    desktop : 1200,
    tablet : 768,
    phone : 600
}

const media = Object.entries(sizes).reduce((acc,[key,value])=> {
    return {
        ...acc,
        [key] : (
            first : CSSObject | TemplateStringsArray,
            ...interplations : SimpleInterpolation[]
        ) => css`
            @media (max-width : ${value}px){
                ${css(first, ...interplations)}
            }
        `,
    }
},{}) as Record<DeviceType,any>

export {media};