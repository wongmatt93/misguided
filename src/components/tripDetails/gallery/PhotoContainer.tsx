import "./PhotoContainer.css";

interface Props {
  photos: string[];
}
const PhotoContainer = ({ photos }: Props) => {
  return (
    <div className="PhotoContainer">
      {photos.length > 0 &&
        photos.map((photo) => <img key={photo} src={photo} alt={photo} />)}
    </div>
  );
};

export default PhotoContainer;
