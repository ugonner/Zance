'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation';
import ROUTES from '../../../consts/Routes';

export interface IConfirmEventDialogProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  toggleOpen?: () => void;
  title?: string;
  description?: string;
}
export const ConfirmEventDialog = ({ isOpen, onOpenChange, toggleOpen, title, description }: IConfirmEventDialogProps) => {
    const router = useRouter();
    return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-center'>
              <h1>{title ?? "Congratulations"}</h1>
            </DialogTitle>
            <DialogDescription className='text-center'>
              {description ?? "You have been checked in for this event"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='text-center'>
            <button onClick={() => {
                if(toggleOpen) toggleOpen();
                router.push(ROUTES.HOME);

            }}>
                Ok
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
