const PrescriptionCard = () => {
    return (
        <div className="w-[327px] h-[87px] rounded-md bg-yellow-400 drop-shadow-lg flex items-center ml-5">
            <div className="w-[108px] h-[87px]"><img className="object-cover w-[108px]" src="../PrescriptionCardBackground.svg" alt="" /></div>
            <div><img src="PrescriptionCardImage.svg" alt="" /></div>
            <div>2</div>
            <div>3</div>
        </div>
    );
}
 
export default PrescriptionCard;