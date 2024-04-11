import { UIContext } from '@/context/UIProvider';
import { UserContext } from '@/context/UserProvider';
import Button from '@/elements/Button';
import Image from '@/elements/Image';
import Text from '@/elements/Text';
import Title from '@/elements/Title';
import { useFruityUser } from '@/hooks/useFruityUser';
import { useIpfs } from '@/hooks/useIpfs';
import { useMintNft } from '@/hooks/useMintNft';
import { useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const UPLOADING_STATE = 1;
const UPLOADED_STATE = 2;
const MINTING_STATE = 3;
const COMPLETED_STATE = 4;
const ERROR_STATE = 5;

const steps = [
  {
    status: 'Ready to Pin',
    disableClose: false,
    pinButtonText: 'Start',
    mintButtonText: 'Start',
    pinButtonDisabled: false,
    mintButtonDisabled: true,
  },
  {
    status: "Uploading to IPFS",
    disableClose: true,
    pinButtonText: 'In progress',
    mintButtonText: 'Start',
    pinButtonDisabled: true,
    mintButtonDisabled: true,
  },
  {
    status: 'Ready to Mint',
    disableClose: true,
    pinButtonText: 'Done',
    mintButtonText: 'Start',
    pinButtonDisabled: true,
    mintButtonDisabled: false,
  },
  {
    status: 'Transaction in progress',
    disableClose: true,
    pinButtonText: 'Done',
    mintButtonText: 'In progress',
    pinButtonDisabled: true,
    mintButtonDisabled: true,
  },
  {
    status: 'Minted Successfully!',
    disableClose: false,
    pinButtonText: 'Done',
    mintButtonText: 'Done',
    pinButtonDisabled: true,
    mintButtonDisabled: true,
  },
  {
    status: 'There was an error',
    disableClose: false,
    pinButtonText: 'Start',
    mintButtonText: 'Start',
    pinButtonDisabled: false,
    mintButtonDisabled: true,
  }
]

export default function Modal() {
  const { setModalIsOpen, modalIsOpen, modalData } = useContext(UIContext);
  const { setUser } = useContext(UserContext);
  const { price, src, id } = modalData;
  const [currentStep, setCurrentStep] = useState(0);
  const { pinFileToIPFS, resultSrc } = useIpfs();
  const { mintNft, isPending, isConfirming, isConfirmed, error } = useMintNft();
  const { addFruityToken } = useFruityUser();
  const { address } = useAccount();
  

  function onCloseModal() {
    if(steps[currentStep].disableClose) return;

    setModalIsOpen(false);
  }

  async function onPinToIPFS() {
    setCurrentStep(UPLOADING_STATE);
    const res = await pinFileToIPFS(`./public${src}`);

    if(!res) setCurrentStep(ERROR_STATE);
    else setCurrentStep(UPLOADED_STATE);
  }

  function onMint() {
    setCurrentStep(MINTING_STATE);

    mintNft({
      uri: resultSrc,
      value: modalData.price
    })
  }

  async function finalizeTransaction() {
    const newUserData = await addFruityToken(address!, id);
    setUser(newUserData);
    
    setCurrentStep(COMPLETED_STATE);
  }

  useEffect(() => {
    if(currentStep === MINTING_STATE && isConfirmed) finalizeTransaction();
    if(currentStep === MINTING_STATE && error) setCurrentStep(ERROR_STATE);
  }, [currentStep, isConfirmed, error])

  return (
    <>
    {modalIsOpen && (
      <div className="modal-window fixed top-0 right-0 bottom-0 left-0 flex-center z-20 bg-black/50" onClick={onCloseModal}>
        <div className="modal-container bg-config-bg-secondary rounded-lg overflow-hidden relative">
          {!steps[currentStep].disableClose && (
            <div className="close absolute top-2 right-2 p-5 bg-config-bg-contrast rounded-full flex-center w-5 h-5 text-config-text-contrast cursor-pointer" onClick={onCloseModal}>X</div>
          )}
          <div className="modal-content flex-center-col min-w-80 md:min-w-96 gap-6 px-8 pt-16 pb-8" onClick={(e) => e.stopPropagation()}>
            <div className="rounded-lg overflow-hidden">
              <Image src={src} alt="yes" width={200} height={200} />
            </div>
            <Title className="text-lg">Price: {price} ETH</Title>
            <div className={`step flex-split w-full ${steps[currentStep].pinButtonDisabled && 'opacity-30'}`}>
              <Text>Pin to IPFS</Text>
              <Button disabled={steps[currentStep].pinButtonDisabled} onClick={onPinToIPFS}>{steps[currentStep].pinButtonText}</Button>
            </div>
            <div className={`step flex-split w-full ${steps[currentStep].mintButtonDisabled && 'opacity-30'}`}>
              <Text>Mint</Text>
              <Button disabled={steps[currentStep].mintButtonDisabled} onClick={onMint}>{steps[currentStep].mintButtonText}</Button>
            </div>
            <div className="step flex-split w-full border-t-2 pt-3">
              <Text>Status: {steps[currentStep].status}</Text>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};