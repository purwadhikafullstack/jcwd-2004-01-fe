const MobileCategoryCard = ({icon, caption}) => {

    return (
        <div className="container-mobile-category-card">
            <div className="text-4xl">{icon}</div>
            <div className="font-bold text-base">{caption}</div>
        </div>
    );
}
 
export default MobileCategoryCard;