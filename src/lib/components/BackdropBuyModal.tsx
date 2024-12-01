import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Flex, Link, List, ListItem, ListIcon, Divider, Spinner, Input } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { FaPix } from 'react-icons/fa6';
import { FaCheck, FaIntercom } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useClipboard } from '@chakra-ui/react';

type ModalProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setBackdropView: Dispatch<SetStateAction<boolean>>,
    setCookies: () => void,
    //hintNumber: number,
    //setHintNumber: Dispatch<SetStateAction<number>>,
}

function BackdropBuyModal(props:ModalProps) {

    const [qrcode64, setQrcode64] = useState<string>('');
    const [copiaecola, setCopiaecola] = useState<string>('');
    const [loadingPayment, setLoadingPayment] = useState<boolean>(false);
    const [paymentRequested, setPaymentRequested] = useState<boolean>(false);
    const [paymentId, setPaymentId] = useState<number>(-1);
    const [verifyingPayment, setVerifyingPayment] = useState<boolean>(false);
    //const [hasCopied, setHasCopied] = useState<boolean>(false);
    
    const toast = useToast();
    const { onCopy, value, setValue, hasCopied } = useClipboard('')

    /*function onCopy() {
        setHasCopied(true);
    }*/

    async function generatePaymentRequest() {
        setLoadingPayment(true);
        setPaymentRequested(true);
        const url = '/api/backdropPayments';
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (res.status == 200) {
            const content = await res.json();
            setQrcode64(content.qrcode.qr_code_base64); 
            setCopiaecola(content.qrcode.qr_code);
            setValue(content.qrcode.qr_code);
            setPaymentId(content.id);
            setLoadingPayment(false); 
            const timeoutId = setTimeout(() => {
                console.log("QR-Code timeout. Resetando.");
                setQrcode64('');
                setLoadingPayment(false);
                //setPaymentRequested(false);
                //setPaymentId(-1);
            }, 1000 * 60 * 5);

            return () => clearTimeout(timeoutId);
        } else {
            // exibir mensagem de erro
            const content = await res.json();
            console.log('erro na geração do qrcode', content.msg);
            toast({
                title: 'Não foi possível gerar o QR-Code.',
                description: "Algum erro inesperado aconteceu. Por favor tente novamente.",
                status: 'error',
                variant: 'solid',
                duration: 9000,
                isClosable: true,
            });
        }    
    }

    async function verifyPaymentDone() {
        setVerifyingPayment(true);
        const url = '/api/similarPayments';
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: paymentId
            })
        });
        if (res.status == 200) {
            const content = await res.json();
            //console.log('verificacao com sucesso', content);
            if (content.data.status != "approved") {
                console.log('pagamento não aprovado. tente novamente ou cancele.')
                toast({
                    title: 'O pagamento ainda não foi aprovado.',
                    description: "O status do seu pagamento não está aprovado. Por favor tente novamente ou cancele.",
                    status: 'error',
                    variant: 'solid',
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                // aumentar a dica e fechar o modal
                toast({
                    title: 'Pagamento verificado com sucesso!',
                    description: "Aproveite o seu frame.",
                    status: 'success',
                    variant: 'solid',
                    duration: 9000,
                    isClosable: true,
                });
                //props.setHintNumber(props.hintNumber+1);
                //props.setRevelar(props.revelar-1);
                props.setBackdropView(true);
                props.setCookies();
                setQrcode64('');
                setLoadingPayment(false);
                setPaymentRequested(false);
                setPaymentId(-1);
                props.setOpen(false);
            }
        } else {
            // exibir mensagem de erro
            const content = await res.json();
            console.log('erro na verificação do pagamento', content.msg);
            toast({
                title: 'Não conseguimos verificar o pagamento.',
                description: "Algum erro inesperado aconteceu. Por favor tente novamente ou cancele.",
                status: 'error',
                variant: 'solid',
                duration: 9000,
                isClosable: true,
            });
        } 
        setVerifyingPayment(false);
    }

  return (
    <Modal onClose={() => props.setOpen(false)} size='md' isOpen={props.open} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                Quer ver mais um frame?
            </ModalHeader>
            {/*<ModalCloseButton />*/}
            <ModalBody>
                <Text fontSize='sm' marginBottom={2}>
                    Você pode conseguir ver o frame por apenas <b>R$1,00</b>.
                </Text>
                <Button display={!paymentRequested ? 'flex' : 'none'} onClick={generatePaymentRequest} colorScheme='red' variant='solid' size='lg' width='100%' leftIcon={<FaPix />}>
                    Quero ver o frame!
                </Button>
                <Flex direction='column' width='100%' alignItems='center' marginY={5}>
                    {paymentRequested && loadingPayment && <Spinner label='Gerando QR-Code' />}
                    {paymentRequested && !loadingPayment && <img src={`data:image/png;base64, ${qrcode64}`} width='250px' />}                    
                    {paymentRequested && !loadingPayment && <Flex marginY={2}>
                        <Input
                        placeholder='Pix Copia e Cola'
                        value={value}
                        mr={2}
                        />
                        <Button onClick={onCopy}>{hasCopied ? 'Copiado!' : 'Copiar'}</Button>
                    </Flex>}
                    {/*{paymentRequested && !loadingPayment && <Text>Payment Id: {paymentId}</Text>}*/}
                </Flex>
                <Text fontSize='sm'>
                    Ao realizar o pagamento, clique no botão de confirmação abaixo.
                </Text>
            </ModalBody>
            <ModalFooter>
                {/*<Button marginX={2} onClick={() => {
                    props.setOpen(false);
                }}>
                    Cancel
                </Button>*/}

                <Flex direction='row' gap={2}>
                    <Button colorScheme='green' leftIcon={<FaCheck />} onClick={verifyPaymentDone} isDisabled={(!paymentRequested || paymentId == -1)} isLoading={verifyingPayment}>
                        Pagamento realizado
                    </Button>
                    <Button onClick={() => {
                        setQrcode64('');
                        setLoadingPayment(false);
                        setPaymentRequested(false);
                        setPaymentId(-1);
                        props.setOpen(false);
                    }
                    } colorScheme='red' variant='outline' leftIcon={<MdCancel />}>
                        Cancelar
                    </Button>
                </Flex>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default BackdropBuyModal