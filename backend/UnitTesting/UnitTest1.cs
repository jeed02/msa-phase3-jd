using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using DomainLayer.Models;
using ServicesLayer.IRepository;
using backend.Controllers;
using Moq;
using FluentAssertions;

namespace UnitTesting
{
    public class Tests
    {
        private CharacterController _controller;
        [SetUp]
        public void Setup()
        {
            var mockFactory = new Mock<IHttpClientFactory>();
            var mockRepo = new Mock<ICharacterRepo>();

            //Initilize mock values
            Character char1 = new Character() { Id = 154, name = "Beidou", vision = "Electro", weapon = "Claymore", constellation = "Victor Mare", birthday = "0000-02-14", rarity = 4 };
            Character char2 = new Character() { Id = 178, name = "Kujou Sara", vision = "Electro", weapon = "Bow", constellation = "Flabellum", birthday = "0000-07-14", rarity = 4 };
            Character char3 = new Character() { Id = 163, name = "Hu Tao", vision = "Pyro", weapon = "Polearm", constellation = "Papilio Charontis", birthday = "0000-07-15", rarity = 5 };
            Character char4 = new Character() { Id = 175, name = "Raiden Shogun", vision = "Electro", weapon = "Polearm", constellation = "Imperatrix Umbrosa", birthday = "0000-06-26", rarity = 5 };
            Character char5 = new Character() { Id = 195, name = "Yun Jin", vision = "Geo", weapon = "Polearm", constellation = "Opera Grandis", birthday = "0000-05-21", rarity = 4 };

            IList<Character> mockCharacters = new List<Character> { char1, char2, char3, char4, char5 };

            //Initialize mock random team
            List<Character> team = new List<Character>();
            Random rand = new Random();
            int[] existingRandInt = new int[4];

            for (int i = 0; i < 4; i++)
            {
                int toSkip = rand.Next(1, mockCharacters.Count());
                while (existingRandInt.Contains(toSkip))
                {
                    toSkip = rand.Next(1, mockCharacters.Count());
                }
                existingRandInt[i] = toSkip;
                Character c = mockCharacters.Skip(toSkip).Take(1).First();
                team.Add(c);
            }

            // Set up to return all characters
            mockRepo.Setup(repo => repo.GetAllCharacters()).Returns(mockCharacters);

            //Set up to return character by name
            mockRepo.Setup(repo => repo.GetCharacter(It.IsAny<string>())).Returns((string c) => mockCharacters.Where(x => x.name == c).FirstOrDefault());

            //Set up to add character
            mockRepo.Setup(repo => repo.AddCharacter(It.IsAny<Character>())).Callback((Character c) => {
                mockCharacters.Add(c);
            });

            //Set up delete character
            mockRepo.Setup(repo => repo.DeleteCharacter(It.IsAny<Character>())).Callback((Character c) => { mockCharacters.Remove(c); });

            //Set up update character
            mockRepo.Setup(repo => repo.UpdateCharacter(It.IsAny<Character>())).Callback((Character c) =>
            {
                Character existingChar = mockCharacters.Where(x => x.name == c.name).FirstOrDefault();
                if (existingChar != null)
                {
                    int index = mockCharacters.IndexOf(existingChar);
                    mockCharacters[index] = c;
                }
            });

            //Set up get randomised team
            mockRepo.Setup(repo => repo.GetTeam()).Returns(team);

            var client = new HttpClient();
            mockFactory.Setup(c => c.CreateClient("genshin")).Returns(client);

            IHttpClientFactory factory = mockFactory.Object;
            ICharacterRepo repo = mockRepo.Object;
            _controller = new CharacterController(factory, repo);

        }
        [Test(Description = "Testing GetCharacter() method for Hu Tao, Hu Tao's name has a space meaning it also tests string formatting")]
        public void GetCharacterHuTao()
        {
            Character HuTao = new Character() { Id = 163, name = "Hu Tao", vision = "Pyro", weapon = "Polearm", constellation = "Papilio Charontis", birthday = "0000-07-15", rarity = 5 };

            ActionResult<Character> actionResult = _controller.Get("Hu Tao");
            var result = actionResult.Result as OkObjectResult;
            var charResult = result.Value;


            //Check if instance of Character
            charResult.Should().BeOfType<Character>();

            //Check if Character fields match with Hu Tao
            if (charResult is Character)
            {
                Character character = (Character)charResult;
                character.name.Should().Be(HuTao.name);
                character.vision.Should().Be(HuTao.vision);
                character.weapon.Should().Be(HuTao.weapon);
                character.constellation.Should().Be(HuTao.constellation);
                character.birthday.Should().Be(HuTao.birthday);
                character.rarity.Should().Be(HuTao.rarity);
            }

        }

        [Test(Description = "Repo has 5 characters, check if GetAll() returns 5")]
        public void GetAllCharacters()
        {

            IEnumerable<Character> result = _controller.GetAll();

            //Check if count is 5, meaning endpoint got all characters
            result.Count().Should().Be(5);
        }

        [Test]
        public void CanAddCharacter()
        {
            Character shenhe = new Character() { name = "Shenhe", vision = "Cryo", weapon = "Polearm", constellation = "Crista Doloris", birthday = "0000-03-10", rarity = 5 };

            int count = _controller.GetAll().Count();
            count.Should().Be(5);

            _controller.Create(shenhe);
            count = _controller.GetAll().Count();
            count.Should().Be(6);

            ActionResult<Character> c = _controller.Get("Shenhe");
            var result = c.Result as OkObjectResult;
            var value = result.Value;

            Assert.IsInstanceOf<Character>(value);
            if (value is Character)
            {

                Character character = (Character)value;
                character.name.Should().Be(shenhe.name);
                character.vision.Should().Be(shenhe.vision);
                character.weapon.Should().Be(shenhe.weapon);
                character.constellation.Should().Be(shenhe.constellation);
                character.birthday.Should().Be(shenhe.birthday);
                character.rarity.Should().Be(shenhe.rarity);
            }

        }

        [Test]
        public void CanDeleteCharacter()
        {
            int count = _controller.GetAll().Count();
            count.Should().Be(5);
            _controller.Delete("Beidou");
            count = _controller.GetAll().Count();
            count.Should().Be(4);

        }

        [Test]
        public void CanUpdateCharacter()
        {
            Character updateChar = new Character() { Id = 195, name = "Yun Jin", vision = "Geo", weapon = "Claymore", constellation = "Opera Grandis", birthday = "0000-05-21", rarity = 4 };
            _controller.Update(updateChar.name, updateChar);
            ActionResult<Character> newChar = _controller.Get(updateChar.name);
            var result = newChar.Result as OkObjectResult;
            var value = result.Value;
            if (value is Character)
            {
                Character character = (Character)value;
                character.name.Should().Be(updateChar.name);
                character.vision.Should().Be(updateChar.vision);
                character.weapon.Should().Be(updateChar.weapon);
                character.constellation.Should().Be(updateChar.constellation);
                character.birthday.Should().Be(updateChar.birthday);
                character.rarity.Should().Be(updateChar.rarity);
            }

        }

        [Test]
        public void ReturnsTeamOf4()
        {
            List<Character> team = _controller.GetTeam();
            int count = team.Count();
            count.Should().Be(4);
            team.Should().OnlyHaveUniqueItems();
        }


    }
}