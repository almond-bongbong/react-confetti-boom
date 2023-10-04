/// <reference types="react" />
type Props = {
    mode?: 'boom';
    x?: number;
    y?: number;
    particleCount?: number;
    deg?: number;
    shapeSize?: number;
    spreadDeg?: number;
    effectInterval?: number;
    effectCount?: number;
    colors?: string[];
    launchSpeed?: number;
} | {
    mode: 'fall';
    particleCount?: number;
    shapeSize?: number;
    colors?: string[];
};
declare function Confetti(props: Props): JSX.Element;
export default Confetti;
export type { Props as ConfettiProps };
