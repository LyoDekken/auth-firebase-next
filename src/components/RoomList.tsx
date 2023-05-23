import { useEffect, useState } from 'react'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Button,
} from '@chakra-ui/react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'
import { format, isBefore, isToday } from 'date-fns'
import { LoadingCircle } from '@/routes/PrivateRoute'

type Room = {
  id: string
  name: string
  clientEmail: string
  clinicEmail: string
  eventDate: string
  time: string
}

const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [showNoRoomsMessage, setShowNoRoomsMessage] = useState(false)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setShowNoRoomsMessage(true)
        const firestore = getFirestore()
        const roomsCollection = collection(firestore, 'rooms')

        // Calculate the start and end indexes for the current page
        const startIndex = (currentPage - 1) * pageSize
        const endIndex = startIndex + pageSize

        // Fetch the rooms for the current page
        const roomsSnapshot = await getDocs(roomsCollection)
        const roomsData = roomsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Room[]

        // Update the rooms state with the current page's data
        setRooms(roomsData.slice(startIndex, endIndex))
      } catch (error) {
        console.log(error)
      } finally {
        setTimeout(() => {
          setShowNoRoomsMessage(false)
        }, 3000)
      }
    }

    fetchRooms()
  }, [currentPage, pageSize])

  const isConsultationCompleted = (eventDate: string) => {
    const currentDate = new Date()
    const consultationDate = new Date(eventDate)

    return isBefore(consultationDate, currentDate)
  }

  const formatTime = (eventDate: string) => {
    const date = new Date(eventDate)
    return format(date, 'HH:mm')
  }

  const getDayIconColor = (eventDate: string) => {
    const consultationDate = new Date(eventDate)

    if (isToday(consultationDate)) {
      return 'green'
    }

    return 'red'
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={4}>
      <Box width={['100%', '80%']} maxWidth="500px" textAlign="center">
        <Heading
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          width="100%"
          marginBottom={6}
          css={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          List of Rooms
        </Heading>
        {rooms.length === 0 ? (
          showNoRoomsMessage === true ? (
            <LoadingCircle />
          ) : (
            <Text>No rooms found.</Text>
          )
        ) : (
          <UnorderedList>
            {rooms.map((room) => (
              <ListItem
                key={room.id}
                display="flex"
                alignItems="center"
                justifyContent={'space-between'}
                mb={4}
                p={2}
                border="1px solid #ddd"
                borderRadius="md"
              >
                <Box p={3}>
                  {isConsultationCompleted(room.eventDate) ? (
                    <FiCheckCircle
                      color={getDayIconColor(room.eventDate)}
                      size={16}
                    />
                  ) : (
                    <FiXCircle
                      color={getDayIconColor(room.eventDate)}
                      size={16}
                    />
                  )}
                </Box>
                <Box p={3}>
                  <Heading
                    as="h4"
                    size="md"
                    textAlign="left"
                    css={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      overflow: 'hidden',
                    }}
                  >
                    {room.name}
                  </Heading>
                  <Text>{formatTime(room.eventDate)}</Text>
                </Box>
                <Box p={3}>
                  <Box
                    as={FaEdit}
                    size={16}
                    m={2}
                    cursor="pointer"
                    onClick={() => {
                      // Handle edit modal opening
                    }}
                  />
                  <Box
                    as={FaTrash}
                    size={16}
                    m={2}
                    cursor="pointer"
                    onClick={() => {
                      // Handle delete modal opening
                    }}
                  />
                </Box>
              </ListItem>
            ))}
          </UnorderedList>
        )}
        <Box mt={4} display="flex" justifyContent="center">
          {currentPage > 1 && (
            <Button onClick={() => setCurrentPage(currentPage - 1)} mr={2}>
              Previous
            </Button>
          )}
          {rooms.length === pageSize && (
            <Button onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default RoomList
