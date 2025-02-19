import "./FilterSection.css";
import DropDown from "../../ui/dropDown/DropDown";
import { useEffect } from "react";
import CheckBox from "../../ui/checkBox/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { changeBrand, changeGeneration, changeModel, fetchBrands, setAvailable } from "../../slices/filterSlice";
import { useTranslation } from "../../hooks/useTranslation";

// Типы для состояния
interface FilterState {
  brand: string[];
  model: string[];
  generation: string[];
  selectedBrand: string | null;
  selectedModel: string | null;
}

function FilterSection() {
  const dispatch = useDispatch();
  const brands = useSelector((state: { filter: FilterState }) => state.filter.brand);
  const models = useSelector((state: { filter: FilterState }) => state.filter.model);
  const generations = useSelector((state: { filter: FilterState }) => state.filter.generation);

  const selectedBrand = useSelector((state: { filter: FilterState }) => state.filter.selectedBrand);
  const selectedModel = useSelector((state: { filter: FilterState }) => state.filter.selectedModel);

  // useTranslation.jsx
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const onChangeCheckBox = (availableBoolean: boolean) => {
    dispatch(setAvailable(availableBoolean ? 1 : 0));
  };

  return (
    <div className="filter-container dark:border-[#252525] dark:bg-[#252525]">
      <div className="filter-wrapper">
        <div className="filter-dropdowns">
          <div className="filter-brands">
            <DropDown
              defaultOption={t("filterAllBrands")}
              options={brands}
              selectHandler={(brandId: string) => {
                dispatch(changeBrand(brandId));
              }}
            />
          </div>

          <div className="filter-models">
            {selectedBrand ? (
              <DropDown
                defaultOption={t("filterAllModels")}
                options={models}
                selectHandler={(modelId: string) => {
                  dispatch(changeModel(modelId));
                }}
              />
            ) : (
              <DropDown defaultOption={t("filterAllModels")} isDropdownDisabled={true} className="dropdown-disabled" />
            )}
          </div>

          <div className="filter-generations">
            {selectedModel && selectedBrand ? (
              <DropDown
                defaultOption={t("filterAllGenerations")}
                options={generations}
                selectHandler={(generationId: string) => {
                  dispatch(changeGeneration(generationId));
                }}
              />
            ) : (
              <DropDown
                defaultOption={t("filterAllGenerations")}
                isDropdownDisabled={true}
                className="dropdown-disabled"
              />
            )}
          </div>

          <div className="filter-available">
            <CheckBox onChangeCheckBox={onChangeCheckBox} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterSection;
