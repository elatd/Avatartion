import { useMediaQuery } from "usehooks-ts";
import { Toaster } from "react-hot-toast";
import { AvatarCanvas } from "./components/avatar/AvatarCanvas";
import { AvatarPartModal } from "./components/avatar/AvatarPartModal";
import { AvatarPartPicker } from "./components/avatar/AvatarPartPicker";
import { AvatarTooltip } from "./components/avatar/AvatarTooltip";
import { AvatarDownloadOptionModal } from "./components/avatar/AvatarDownloadOptionModal";
import { Footer } from "./components/Footer";

import { useAvatar } from "./hooks/useAvatar";
import { Selector } from "./components/parts/Selector";

import { useEffect } from "react";
import { Confetti } from "@neoconfetti/react";

const Title = () => <h1 className="font-bold text-3xl">Avatartion</h1>;

function App() {
  const {
    avatar,
    avatarPartsPickers,
    restAvatarPartsPickers,
    isAvatarModalPickerOpen,
    isShared,
    avatarModal,
    avatarCanvasRef,
    isDownloadOptionModalOpen,
    showConfetti,
    confettiOptions,
    setAvatar,
    setIsAvatarModalPickerOpen,
    setIsDownloadOptionModalOpen,
    openAvatarModalPicker,
    closeAvatarModalPicker,
    openAvatarDownloadOptionModal,
    handleDownloadAvatarPNG,
    handleDownloadAvatarSVG,
    handleRandomizeAvatar,
    share,
    serialize,
  } = useAvatar({ soundEnabled: true });

  useEffect(() => {
    if (!isShared) return;

    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.has("shared")) {
      currentParams.delete("shared");
    }

    currentParams.set("avatar", serialize());
    window.history.pushState(null, "", `?${currentParams.toString()}`);
  }, [avatar, isShared]);

  const isMobile = useMediaQuery("(max-width: 768px)");

  if (Object.entries(avatar).length === 0) return null;

  return (
    <>
      <div className="overflow-hidden">
        {!isMobile ? (
          <div className="mx-auto text-center w-[750px] h-auto">
            <div className="flex items-center justify-center pt-5 md:pt-[5vh] mb-4 md:mb-0">
              <Title />
            </div>
            <div className="flex items-center justify-center relative">
            {showConfetti && <Confetti {...confettiOptions} />}
              <div className="flex items-center justify-center h-[44vh] md:h-[47vh]">
                <AvatarCanvas {...avatar} ref={avatarCanvasRef} />
              </div>
              <div className="absolute -right-6">
                <div className="flex space-x-6">
                  <div className="flex flex-col space-y-4">
                    {avatarPartsPickers.map((picker) => (
                      <AvatarTooltip
                        key={picker.path}
                        text={picker.text}
                        width={picker.width}
                      >
                        <div className="flex items-center">
                          <AvatarPartPicker
                            path={picker.path}
                            onClick={() => openAvatarModalPicker(picker)}
                          />
                          {picker.isModal && (
                            <Selector
                              onSelectorClick={() =>
                                openAvatarModalPicker(picker)
                              }
                            />
                          )}
                        </div>
                      </AvatarTooltip>
                    ))}
                  </div>
                  <div className="flex flex-col space-y-4">
                    {restAvatarPartsPickers.map((picker) => (
                      <AvatarTooltip
                        key={picker.path}
                        text={picker.text}
                        width={picker.width}
                      >
                        <div className="flex items-center">
                          <AvatarPartPicker
                            path={picker.path}
                            onClick={() => openAvatarModalPicker(picker)}
                          />
                          {picker.isModal && (
                            <Selector
                              onSelectorClick={() =>
                                openAvatarModalPicker(picker)
                              }
                            />
                          )}
                        </div>
                      </AvatarTooltip>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute left-24">
                <div className="flex flex-col space-y-2 md:space-y-4">
                  <AvatarTooltip text="Download" width={60}>
                    <AvatarPartPicker
                      path="base/Download"
                      onClick={() => openAvatarDownloadOptionModal()}
                    />
                  </AvatarTooltip>
                  <AvatarTooltip text="Randomize" width={60}>
                    <AvatarPartPicker
                      path="base/Reload"
                      onClick={() => handleRandomizeAvatar()}
                    />
                  </AvatarTooltip>
                  
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center px-4 space-y-2 pb-12">
              <Footer />
            </div>
          </div>
        ) : (
          <div className="mx-auto text-center sm:w-3/4 md:w-1/2">
            <div className="flex items-center justify-center pt-5 md:pt-[5vh] mb-4 md:mb-0">
              <Title />
            </div>
            <div className="flex items-center justify-center h-[44vh] md:h-[47vh]">
              <AvatarCanvas {...avatar} ref={avatarCanvasRef} />
            </div>
            <div className="flex items-center justify-center">
            {showConfetti && <Confetti {...confettiOptions} />}
              <div className="flex flex-col items-center justify-center px-4 pt-6 space-y-2 overflow-x-auto">
                <div className="flex space-x-3 md:space-x-4 ">
                  {avatarPartsPickers.map((picker) => (
                    <AvatarTooltip
                      key={picker.path}
                      text={picker.text}
                      width={picker.width}
                    >
                      <div className="flex items-center overflow-x-auto">
                          <AvatarPartPicker
                            path={picker.path}
                            onClick={() => openAvatarModalPicker(picker)}
                          />
                      </div>
                    </AvatarTooltip>
                  ))}
                </div>
                <div className="flex space-x-3 md:space-x-4 ">
                  {restAvatarPartsPickers.map((picker) => (
                    <AvatarTooltip
                      key={picker.path}
                      text={picker.text}
                      width={picker.width}
                    >
                      <div className="flex items-center overflow-x-auto">
                        <AvatarPartPicker
                          path={picker.path}
                          onClick={() => openAvatarModalPicker(picker)}
                        />
                      </div>
                    </AvatarTooltip>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex space-x-2 md:space-x-4 pt-6">
                <AvatarTooltip text="Download" width={60}>
                  <AvatarPartPicker
                    path="base/Download"
                    onClick={() => openAvatarDownloadOptionModal()}
                  />
                </AvatarTooltip>
                <AvatarTooltip text="Randomize" width={60}>
                  <AvatarPartPicker
                    path="base/Reload"
                    onClick={() => handleRandomizeAvatar()}
                  />
                </AvatarTooltip>

              </div>
            </div>
            <div className="pb-24">
              <Footer />
            </div>
          </div>
        )}
      </div>
      <AvatarPartModal
        {...avatarModal}
        isOpen={isAvatarModalPickerOpen}
        onPartSelected={(part, src) => closeAvatarModalPicker(part, src)}
        onClose={() => setIsAvatarModalPickerOpen(false)}
      />
      <AvatarDownloadOptionModal
        isOpen={isDownloadOptionModalOpen}
        onDownloadOption={(option: "SVG" | "PNG") =>
          option === "SVG"
            ? handleDownloadAvatarSVG()
            : handleDownloadAvatarPNG()
        }
        onClose={() => setIsDownloadOptionModalOpen(false)}
      />
      <Toaster />
    </>
  );
}

export default App;
