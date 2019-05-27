import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faExclamationTriangle,
  faArrowRight,
  faArrowLeft,
  faSignInAlt,
  faPencilAlt,
  faUserPlus,
  faTrashAlt,
  faSearch,
  faUpload,
  faTimes,
  faCheck,
  faPlus,
  faEye,
} from '@fortawesome/free-solid-svg-icons'

const Icons = () => {
  library.add(faExclamationTriangle)
  library.add(faArrowRight)
  library.add(faPencilAlt)
  library.add(faArrowLeft)
  library.add(faSignInAlt)
  library.add(faTrashAlt)
  library.add(faUserPlus)
  library.add(faSearch)
  library.add(faUpload)
  library.add(faTimes)
  library.add(faCheck)
  library.add(faPlus)
  library.add(faEye)
}

export default Icons
