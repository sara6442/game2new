export interface CoatProps {
  color?: string
  align?: { x: number; y: number; scale: number }
}

export interface CoatItem {
  id: string
  name: string
  Component: React.FC<CoatProps>
  sleeveLength: 'long' | 'short'
}

function makePngCoat(src: string): React.FC<CoatProps> {
  return function PngCoat({ align }: CoatProps) {
    const { x = 0, y = 0, scale = 1 } = align ?? {}
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image href={src} x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
      </g>
    )
  }
}

export const COAT_ITEMS: CoatItem[] = []
export default COAT_ITEMS
