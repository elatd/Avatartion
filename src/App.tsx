import { Toaster } from "react-hot-toast";
import { AvatarCanvas } from "./components/avatar/AvatarCanvas";
import { AvatarPartModal } from "./components/avatar/AvatarPartModal";
import { AvatarPartPicker } from "./components/avatar/AvatarPartPicker";
import { AvatarDownloadOptionModal } from "./components/avatar/AvatarDownloadOptionModal";
import { Footer } from "./components/Footer";

import { useAvatar } from "./hooks/useAvatar";
import { Selector } from "./components/parts/Selector";

import { useEffect } from "react";
import { Confetti } from "@neoconfetti/react";

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
    setIsAvatarModalPickerOpen,
    setIsDownloadOptionModalOpen,
    openAvatarModalPicker,
    closeAvatarModalPicker,
    openAvatarDownloadOptionModal,
    handleDownloadAvatarPNG,
    handleDownloadAvatarSVG,
    handleRandomizeAvatar,
    serialize,
  } = useAvatar();

  useEffect(() => {
    if (!isShared) return;

    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.has("shared")) {
      currentParams.delete("shared");
    }

    currentParams.set("avatar", serialize());
    window.history.pushState(null, "", `?${currentParams.toString()}`);
  }, [avatar, isShared]);

  if (Object.entries(avatar).length === 0) return null;

  return (
    <>
      <div className="mx-auto text-center sm:w-3/4 md:w-1/2 overflow-hidden">
        {showConfetti && <Confetti {...confettiOptions} />}
        <div className="flex items-center justify-center h-[44vh] md:h-[47vh]">
          <AvatarCanvas {...avatar} ref={avatarCanvasRef} />
        </div>
        <div className="flex flex-col items-center justify-center px-4 pt-6 space-y-2 overflow-x-auto">
          <div className="flex space-x-3 md:space-x-4">
            {avatarPartsPickers.map((picker) => (
              <div key={picker.path} className="flex items-center overflow-x-auto">
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
            ))}
          </div>
          <div className="flex space-x-3 md:space-x-4">
            {restAvatarPartsPickers.map((picker) => (
              <div key={picker.path} className="flex items-center overflow-x-auto">
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
            ))}
          </div>
        </div>
        <div className="flex space-x-2 md:space-x-4 pt-6">
          <AvatarPartPicker
            path="base/Download"
            onClick={() => openAvatarDownloadOptionModal()}
          />
          <AvatarPartPicker
            path="base/Reload"
            onClick={() => handleRandomizeAvatar()}
          />
        </div>
        <div className="pb-24">
          <Footer />
        </div>
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
