import { api } from "boot/axios";

const Member = {
  getMembers: () => {
    return api.get("/members");
  },
  getMember: (keyword) => {
    return api.get("/members/search/" + keyword);
  },
};

export default Member;
