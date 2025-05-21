import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

export const transactions = [
  {
    title : formatDistanceToNow(new Date(), { locale : enUS, addSuffix : true }),
    data : [
      { category : "salary", date : new Date(), id :1, item : "Freelance", type : "income", value : 2000 },
      { category : "bill", date : '2025-05-19T20:36:40.522Z', id :2, item : "Light bill", type : "outcome", value : 300 },
    ]
  },
  {
    title : formatDistanceToNow(new Date("2025-05-18T20:36:40.522Z"), { locale : enUS, addSuffix : true }),
    data : [
      { category : "salary", date : new Date("2025-05-18T20:36:40.522Z"), id :9, item : "Eua", type : "outcome", value : 200 },
      { category : "shopping", date : '2025-05-18T20:36:40.522Z', id :7, item : "Roupa", type : "outcome", value : 60 },
    ]
  },
  {
    title : formatDistanceToNow(new Date("2025-05-18T20:36:40.522Z"), { locale : enUS, addSuffix : true }),
    data : [
      { category : "salary", date : new Date("2025-05-18T20:36:40.522Z"), id :3, item : "Eua", type : "outcome", value : 200 },
      { category : "shopping", date : '2025-05-18T20:36:40.522Z', id :5, item : "Roupa", type : "outcome", value : 60 },
    ]
  },
  {
    title : formatDistanceToNow(new Date("2025-05-18T20:36:40.522Z"), { locale : enUS, addSuffix : true }),
    data : [
      { category : "salary", date : new Date("2025-05-18T20:36:40.522Z"), id :4, item : "Eua", type : "outcome", value : 200 },
      { category : "shopping", date : '2025-05-18T20:36:40.522Z', id :6, item : "Roupa", type : "outcome", value : 60 },
    ]
  }
];
