export default function Tile(props: React.ComponentProps<'div'>) {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    );
}