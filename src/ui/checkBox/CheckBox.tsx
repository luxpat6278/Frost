import "./CheckBox.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsChecked } from "../../slices/filterSlice.tsx";
import { useTranslation } from "../../hooks/useTranslation.tsx";

interface CheckBoxProps {
  onChangeCheckBox: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ onChangeCheckBox }) => {
  const dispatch = useDispatch();
  const isChecked = useSelector((state: any) => state.filter.isChecked);

  const checkBox = () => {
    dispatch(setIsChecked(!isChecked));
    onChangeCheckBox(!isChecked);
  };

  // useTranslation hook
  const { t } = useTranslation();

  return (
    <div className="flex h-[33px] w-[220px] items-center justify-start bg-[#7fb364] pl-4 sm:w-[300px] md:w-[400px] lg:w-[170px] xl:w-[220px]">
      <input
        id="checkBox"
        // prettier-ignore
        className="
          mr-2
          h-4
          w-4
          border-white
          rounded-sm
          checked:accent-white
          cursor-pointer
        "
        type="checkbox" // Corrected type from 'checkBox' to 'checkbox'
        onClick={checkBox}
      />
      <label className="text-white" htmlFor="checkBox">
        {t("checkBoxAvailable")}
      </label>
    </div>
  );
};

export default CheckBox;