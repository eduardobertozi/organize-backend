import { WatchedList } from '@/core/entities/watched-list'
import { ProductAttachment } from './product-attachment'

export class ProductAttachmentsList extends WatchedList<ProductAttachment> {
  compareItems(a: ProductAttachment, b: ProductAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
