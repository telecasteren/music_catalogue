import InputField from "./input-field";
import PrimaryButton from "./primary-button";
import { AlbumIcon } from "./utils/mui-icons";

const MusicForm = () => {
  const submitFormEvent = () => {
    // Add form submission logic here

    console.log("Form submitted");
  };

  return (
    <div className="music-form-container">
      <div className="music-form">
        <InputField label="Artist" id="artist" />
        <InputField label="Album" id="album" />

        <PrimaryButton
          text="Add to catalogue"
          onClick={submitFormEvent}
          icon={<AlbumIcon />}
        />
      </div>
    </div>
  );
};

export default MusicForm;
