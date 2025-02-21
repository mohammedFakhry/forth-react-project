import Skeleton from "react-loading-skeleton"

export default function SkeletonShow(props) {
    const skeletonLength = Array.from({length: props.length}).map( (_, key)=> (
        <div className={props.classes} key={key}>
            <div className='mx-1'>
                <Skeleton width={props.width} height={props.height} baseColor={props.baseColor} highlightColor={props.highlightColor} />
            </div>
        </div>
    ) )

    return skeletonLength
}