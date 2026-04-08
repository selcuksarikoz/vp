'use client';

import { usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { updateCartLineAction } from '@/actions/cart';
import { IconButton } from '@/components/ui/icon-button';

type CartLineRemoveButtonProps = Readonly<{
  productId: string;
  variantId?: string | null;
}>;

export function CartLineRemoveButton({ productId, variantId }: CartLineRemoveButtonProps) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [isPending, startTransition] = useTransition();

  function handleRemove() {
    startTransition(async () => {
      const formData = new FormData();
      formData.set('currentPath', pathname);
      formData.set('productId', productId);
      formData.set('quantity', '0');

      if (variantId) {
        formData.set('variantId', variantId);
      }

      await updateCartLineAction(formData);
    });
  }

  return (
    <IconButton
      aria-label={t('cart.removeItem', 'Remove item')}
      className="h-10 w-10 border-black/10 bg-white text-zinc-400 hover:border-red-500/30 hover:bg-red-50 hover:text-red-500 shrink-0"
      disabled={isPending}
      onClick={handleRemove}
      title={t('cart.removeItem', 'Remove item')}
    >
      <Trash2 className="h-4 w-4" />
    </IconButton>
  );
}
