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
    roomDetails: RoomDetails
    recipientDetails: RecipientDetails
    managerDetails: ManagerDetails
    trackingNumber: string
    carrier: string
    description: string
    status: string
    deliveredAt: any
    collectedAt?: string
    createdAt: string
  }
  
  export interface RoomDetails {
    id: number
    roomId: string
    building: string
    floor: string
    roomNumber: string
  }
  
  export interface RecipientDetails {
    id: number
    username: string
    email: string
    fullName: string
    phone: any
    userRole: string
  }
  
  export interface ManagerDetails {
    id: number
    username: string
    email: string
    fullName: string
    phone: string
    userRole: string
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
  
  
  