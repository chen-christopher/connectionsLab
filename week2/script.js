const app = {
  initialize: () => {
    const content__bridgeBlocks = document.querySelectorAll(
      ".content__bridgeBlock"
    );
    for (let i = 0; i < content__bridgeBlocks.length; i++) {
      content__bridgeBlocks[i].addEventListener("click", app.showEndPage);
    }
  },
  endPageShown: false,
  endAnim: false,
  showEndPage: () => {
    if (!app.endAnim) {
      if (!app.endPageShown) {
        console.log("in here");
        $(".content__bridgeBlock")
          .addClass("mergeImgAnim")
          .removeClass("seperateImgAnim");
        $(".content__bridgeBlock__img").removeClass("rounded");
        $(".content__bridgeBlock__charBlock").addClass("opacityFull");
        app.endPageShown = true;
        app.endAnim = true;
      } else {
        console.log("ine lse");
        $(".content__bridgeBlock").addClass("shiftContent");
        $(".content__bridgeBlock__img").addClass("rounded");
        $(".content__bridgeBlock__charBlock").removeClass("opacityFull");
        $(".content__bridgeBlock")
          .addClass("seperateImgAnim")
          .removeClass("mergeImgAnim");
        app.endPageShown = false;
        app.endAnim = true;
      }
      setTimeout(() => {
        app.endAnim = false;
      }, 1000);
    }
  },
};
