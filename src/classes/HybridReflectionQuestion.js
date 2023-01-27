// This class combines properties of a reflection question as well as a
// reflection exit question ticket, hence 'hybrid'
export default function HybridReflectionQuestion(exit_ticket_id, text, order) {
  this.exit_ticket_id = exit_ticket_id;
  this.text = text;
  this.order = order;
}
