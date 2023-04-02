import axios from "src/api/axios";

const addDirectHotelToHotel = async (
  hotelId,
  direct_hotel_id,
  token,
  setSelectedId,
  selectedDirectHotelName,
  mutate
) => {
  try {
    let data = new FormData();
    data.append("direct_hotel_id", direct_hotel_id);

    const res = await axios.request({
      method: "POST",
      url: `/api/admin/hotels/${hotelId}/direct/store`,
      headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
      data: data,
    });
    if (res.status === 200) {
      setSelectedId(res.data.response.direct_hotel.id);
      selectedDirectHotelName(res.data.response.direct_hotel.name);
      mutate();
    }
  } catch (err) {
    console.log(err);
  }
};

export default addDirectHotelToHotel;
