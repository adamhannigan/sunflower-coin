import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { BumpkinParts } from "lib/utils/tokenUriBuilder";
import { Button } from "components/ui/Button";

type ButtonInfo = {
  id: string;
  text: string;
  closeModal?: boolean;
};

type CommunityModal = {
  npc: {
    clothing: BumpkinParts;
    name: string;
  };
  jsx: JSX.Element;
  buttons?: ButtonInfo[];
  onClose?: (modal: CommunityModal) => void;
  onButtonClick?: (buttonId: string) => void;
};

class CommunityModalManager {
  private listener?: (npc: CommunityModal, isOpen: boolean) => void;

  private id = 0;

  constructor() {
    console.log("CINIT");
    this.id = Date.now();
    console.log({ id: this.id });
  }
  public open = (modal: CommunityModal) => {
    console.log("YEEET", this, this.listener);

    if (this.listener) {
      console.log("INSIDE");
      this.listener(modal, true);
    }
  };

  public listen(cb: (npc: CommunityModal, isOpen: boolean) => void) {
    this.listener = cb;
    console.log("Listn now", this.listener);
  }
}

export const communityModalManager = new CommunityModalManager();

export const CommunityModals: React.FC = () => {
  const [modal, setModal] = useState<CommunityModal>();

  useEffect(() => {
    communityModalManager.listen((modal, open) => {
      console.log("OPENED", { modal });
      setModal(modal);
    });
  }, []);

  const closeModal = () => {
    if (modal && modal.onClose) {
      modal.onClose(modal);
    }
    setModal(undefined);
  };

  const handleButtonClick = (buttonId: string) => {
    const clickedButton = modal?.buttons?.find(
      (button) => button.id === buttonId
    );
    if (clickedButton) {
      if (clickedButton.closeModal) {
        setModal(undefined);
      }

      if (modal && modal.onButtonClick) {
        modal.onButtonClick(buttonId);
      }
    }
  };

  return (
    <>
      <Modal show={!!modal} centered onHide={closeModal}>
        <CloseButtonPanel
          onClose={closeModal}
          bumpkinParts={modal?.npc?.clothing}
        >
          <div className="p-2">{modal?.jsx}</div>
          <div className="d-flex justify-content-end">
            {modal?.buttons?.map((button) => (
              <Button
                key={button.id}
                className="m-2"
                onClick={() => handleButtonClick(button.id)}
              >
                {button.text}
              </Button>
            ))}
          </div>
        </CloseButtonPanel>
      </Modal>
    </>
  );
};
