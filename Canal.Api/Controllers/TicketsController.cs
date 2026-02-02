using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Canal.Api.Data;
using Canal.Api.Models;

namespace Canal.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly CanalDbContext _context;

        public TicketsController(CanalDbContext context)
        {
            _context = context;
        }

        // GET: api/tickets/{projectId}
        [HttpGet("{projectId}")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets(int projectId)
        {
            var tickets = await _context.Tickets
                                        .Where(t => t.ProjectId == projectId)
                                        .ToListAsync();
            return Ok(tickets);
        }

        // POST: api/tickets/{projectId}
        [HttpPost("{projectId}")]
        public async Task<ActionResult<Ticket>> CreateTicket(int projectId, [FromBody] Ticket ticket)
        {
            ticket.ProjectId = projectId;
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTickets), new { projectId }, ticket);
        }
    }
}
