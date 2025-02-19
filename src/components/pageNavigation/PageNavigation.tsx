import "./PageNavigation.css";
import PageNavButton from "../../ui/pageNavButton/PageNavButton";
import ButtonStandard from "../../ui/buttonStandard/ButtonStandard";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../slices/filterSlice";
import { useTranslation } from "../../hooks/useTranslation";

// Типы состояния фильтра
interface FilterState {
  currentPage: number;
  totalPages: number;
}

function PageNavigation() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Получаем состояние из Redux
  const currentPage = useSelector((state: { filter: FilterState }) => state.filter.currentPage);
  const totalPages = useSelector((state: { filter: FilterState }) => state.filter.totalPages);

  const onPageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const pageForward = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageBack = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const firstPage = () => {
    return currentPage > 3 ? (
      <div className="pageNavIndent">
        <PageNavButton
          isActive={currentPage === 1}
          index={1}
          clickHandler={() => onPageChange(1)}
        />
        <div className="pageNavEllipsis">...</div>
      </div>
    ) : (
      <PageNavButton
        isActive={currentPage === 1}
        index={1}
        clickHandler={() => onPageChange(1)}
      />
    );
  };

  const lastPage = () => {
    if (totalPages !== 1) {
      return currentPage < totalPages - 2 ? (
        <div className="pageNavIndent">
          <div className="pageNavEllipsis">...</div>
          <PageNavButton
            isActive={currentPage === totalPages}
            index={totalPages}
            clickHandler={() => onPageChange(totalPages)}
          />
        </div>
      ) : (
        <PageNavButton
          isActive={currentPage === totalPages}
          index={totalPages}
          clickHandler={() => onPageChange(totalPages)}
        />
      );
    }
  };

  const renderPageButtons = () => {
    const threePages: JSX.Element[] = [];

    for (let i = 2; i <= totalPages - 1; i++) {
      const pageNavButton = (
        <PageNavButton
          isActive={i === currentPage}
          key={i}
          index={i}
          clickHandler={() => onPageChange(i)}
        />
      );

      if ((currentPage <= 3 && i <= 4) || (currentPage >= totalPages - 2 && i >= totalPages - 3)) {
        threePages.push(pageNavButton);
      } else if (i === currentPage || i === currentPage - 1 || i === currentPage + 1) {
        threePages.push(pageNavButton);
      }
    }

    return threePages;
  };

  return (
    <div className="page-nav-container dark:border-[#222222] dark:bg-[#222222]">
      {totalPages > 0 && (
        <>
          <ButtonStandard
            name={t("pageNavBack")}
            clickHandler={pageBack}
            isDisabled={currentPage === 1}
            className="pageNavComponentBack"
          />

          {firstPage()}
          {renderPageButtons()}
          {lastPage()}

          <ButtonStandard
            name={t("pageNavForward")}
            clickHandler={pageForward}
            isDisabled={currentPage === totalPages}
            className="pageNavComponentForward"
          />
        </>
      )}
    </div>
  );
}

export default PageNavigation;
