import { api } from "boot/axios";

const Member = {
  getMembers: () => {
    return api.get("/members");
  },
  getMember: (data) => {
    return api.post("/members/search", data);
  },
};

export default Member;
