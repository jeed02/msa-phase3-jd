using Microsoft.EntityFrameworkCore;
using DomainLayer.Models;


namespace DomainLayer.Data
{
	public class CharacterDb : DbContext
	{
		public CharacterDb(DbContextOptions<CharacterDb> options) : base(options) { }

		public DbSet<Character> Characters { get; set; } = null!;

	}

	

}
