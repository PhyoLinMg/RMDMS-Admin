export interface Root {
    content: Parcel[]
    pageable: Pageable
    last: boolean
    totalPages: number
    totalElements: number
    first: boolean
    size: number
    number: number
    sort: Sort
    numberOfElements: number
    empty: boolean
  }
  
  export interface Parcel {
    id: number
    recipientName: string
    managerName: string
    trackingNumber: string
    carrier: string
    description: string
    status: string
    deliveredAt: any
    roomNumber: string
    collectedAt?: string
    createdAt: string
  }
  
  export interface Pageable {
    pageNumber: number
    pageSize: number
    sort: Sort
    offset: number
    unpaged: boolean
    paged: boolean
  }
  
  export interface Sort {
    empty: boolean
    unsorted: boolean
    sorted: boolean
  }
  
  
  