export interface AccessoryProps {
  color?: string
  align?: { x: number; y: number; scale: number }
}

export interface AccessoryItem {
  id: string
  name: string
  Component: React.FC<AccessoryProps>
}

function makePngAccessory(src: string): React.FC<AccessoryProps> {
  return function PngAccessory({ align }: AccessoryProps) {
    const { x = 0, y = 0, scale = 1 } = align ?? {}
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image href={src} x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
      </g>
    )
  }
}

export const ACCESSORY_ITEMS: AccessoryItem[] = []
export default ACCESSORY_ITEMS
