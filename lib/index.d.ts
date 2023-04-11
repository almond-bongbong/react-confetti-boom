/// <reference types="react" />
interface Props {
    x?: number;
    y?: number;
    particleCount?: number;
    deg?: number;
    shapeSize?: number;
    spreadDeg?: number;
    effectInterval?: number;
    effectCount?: number;
    colors?: string[];
}
declare function Confetti({ x, y, particleCount, deg, shapeSize, spreadDeg, effectInterval, effectCount, colors, }: Props): JSX.Element;
export default Confetti;
